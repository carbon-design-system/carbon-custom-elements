/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { action } from '@storybook/addon-actions';
import Delete16 from '@carbon/icons-react/es/delete/16';
import Download16 from '@carbon/icons-react/es/download/16';
import Settings16 from '@carbon/icons-react/es/settings/16';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXBtn from 'carbon-custom-elements/es/components-react/button/button';
// @ts-ignore
import BXOverflowMenu from 'carbon-custom-elements/es/components-react/overflow-menu/overflow-menu';
// @ts-ignore
import BXOverflowMenuBody from 'carbon-custom-elements/es/components-react/overflow-menu/overflow-menu-body';
// @ts-ignore
import BXOverflowMenuItem from 'carbon-custom-elements/es/components-react/overflow-menu/overflow-menu-item';
// @ts-ignore
import BXPagination from 'carbon-custom-elements/es/components-react/pagination/pagination';
// @ts-ignore
import BXPageSizesSelect from 'carbon-custom-elements/es/components-react/pagination/page-sizes-select';
// @ts-ignore
import BXPagesSelect from 'carbon-custom-elements/es/components-react/pagination/pages-select';
// @ts-ignore
import BXTable, { TABLE_SIZE } from 'carbon-custom-elements/es/components-react/data-table/table';
// @ts-ignore
import BXTableHead from 'carbon-custom-elements/es/components-react/data-table/table-head';
// @ts-ignore
import BXTableHeaderRow from 'carbon-custom-elements/es/components-react/data-table/table-header-row';
import BXTableHeaderCell, {
  TABLE_SORT_DIRECTION,
  // @ts-ignore
} from 'carbon-custom-elements/es/components-react/data-table/table-header-cell';
// @ts-ignore
import BXTableBody from 'carbon-custom-elements/es/components-react/data-table/table-body';
// @ts-ignore
import BXTableRow from 'carbon-custom-elements/es/components-react/data-table/table-row';
// @ts-ignore
import BXTableCell from 'carbon-custom-elements/es/components-react/data-table/table-cell';
// @ts-ignore
import BXTableToolbar from 'carbon-custom-elements/es/components-react/data-table/table-toolbar';
// @ts-ignore
import BXTableToolbarContent from 'carbon-custom-elements/es/components-react/data-table/table-toolbar-content';
// @ts-ignore
import BXTableToolbarSearch from 'carbon-custom-elements/es/components-react/data-table/table-toolbar-search';
// @ts-ignore
import BXTableBatchActions from 'carbon-custom-elements/es/components-react/data-table/table-batch-actions';
import BXBtnElement from '../button/button';
import { rows as demoRows, rowsMany as demoRowsMany, columns as demoColumns, sortInfo as demoSortInfo } from './stories/data';
import { TDemoTableColumn, TDemoTableRow, TDemoSortInfo } from './stories/types';
import {
  defaultStory as baseDefaultStory,
  sortable as baseSortable,
  sortableWithPagination as baseSortableWithPagination,
} from './data-table-story';

export { default } from './data-table-story';

/**
 * The map of how sorting direction affects sorting order.
 */
const collationFactors = {
  [TABLE_SORT_DIRECTION.ASCENDING]: 1,
  [TABLE_SORT_DIRECTION.DESCENDING]: -1,
};

/**
 * @param row A table row.
 * @param searchString A search string.
 * @returns `true` if the given table row matches the given search string.
 */
const doesRowMatchSearchString = (row: TDemoTableRow, searchString: string) =>
  Object.keys(row).some(key => key !== 'id' && String(row[key] ?? '').indexOf(searchString) >= 0);

/**
 * A class to manage table states, like selection and sorting.
 * DEMONSTRATION-PURPOSE ONLY.
 * Data/state handling in data table tends to involve lots of application-specific logics
 * and thus abstracting everything in a library won't be a good return on investment
 * vs. letting users copy code here and implement features that fit their needs.
 */
const BXCEDemoDataTable = ({
  id,
  collator,
  columns,
  hasSelection,
  pageSize: propPageSize,
  rows: propRows,
  size,
  sortInfo: propSortInfo,
  start: propStart,
  zebra,
  onChangeSelection,
  onChangeSelectionAll,
  onSort,
}: {
  id?: string;
  collator?: Intl.Collator;
  columns: TDemoTableColumn[];
  hasSelection?: boolean;
  pageSize?: number;
  rows: TDemoTableRow[];
  size?: TABLE_SIZE;
  sortInfo: TDemoSortInfo;
  start?: number;
  zebra?: boolean;
  onChangeSelection?: (event: CustomEvent) => void;
  onChangeSelectionAll?: (event: CustomEvent) => void;
  onSort?: (event: CustomEvent) => void;
}) => {
  const uniqueId = useMemo(
    () =>
      Math.random()
        .toString(36)
        .slice(2),
    []
  );
  const elementId = id || uniqueId;

  const [pageSize, setPageSize] = useState(propPageSize);
  const [rows, setRows] = useState(propRows);
  const [searchString, setSearchString] = useState('');
  const [debouncedSearchString] = useDebounce(searchString, 500);
  const [sortInfo, setSortInfo] = useState(propSortInfo);
  const [start, setStart] = useState(propStart);

  const filteredRows = useMemo(
    () => (!debouncedSearchString ? rows : rows.filter(row => doesRowMatchSearchString(row, debouncedSearchString))),
    [debouncedSearchString, rows]
  );
  const selectedRowsCountInFiltered = filteredRows!.filter(({ selected }) => selected!).length;
  const hasBatchActions = hasSelection && selectedRowsCountInFiltered > 0;
  const { length: count } = filteredRows;
  const adjustedStart =
    count === 0 || start! < count ? start! : Math.max(start! - Math.ceil((start! - count) / pageSize!) * pageSize!, 0);

  const { columnId: sortColumnId, direction: sortDirection } = sortInfo;
  const selectionAllName = !hasSelection ? undefined : `__bx-ce-demo-data-table_select-all_${elementId}`;
  const selectedAllInFiltered = selectedRowsCountInFiltered > 0 && filteredRows!.length === selectedRowsCountInFiltered;

  const compare = useCallback(
    (lhs, rhs) => {
      if (typeof lhs === 'number' && typeof rhs === 'number') {
        return lhs - rhs;
      }
      return collator!.compare(lhs, rhs);
    },
    [collator]
  );

  const sortedRows =
    sortDirection === TABLE_SORT_DIRECTION.NONE
      ? filteredRows
      : filteredRows
          .slice()
          .sort((lhs, rhs) => collationFactors[sortDirection] * compare(lhs[sortColumnId!], rhs[sortColumnId!]));

  const handleCancelSelection = useCallback(() => {
    setRows(
      rows!.map(row =>
        debouncedSearchString && !doesRowMatchSearchString(row, debouncedSearchString) ? row : { ...row, selected: false }
      )
    );
  }, [rows, debouncedSearchString]);

  const handleChangeSearchString = useCallback(
    ({ detail }: CustomEvent) => {
      const { value } = detail;
      setSearchString(value);
    },
    [pageSize, setSearchString]
  );

  const handleChangePageSize = useCallback(({ detail }: CustomEvent) => {
    setPageSize(detail.value);
  }, []);

  const handleChangeSelection = useCallback(
    (event: CustomEvent) => {
      if (onChangeSelection) {
        onChangeSelection(event);
      }
      const { defaultPrevented, detail, target } = event;
      if (!defaultPrevented) {
        const { rowId: changedRowId } = (target as HTMLElement).dataset;
        const { selected } = detail;
        setRows(rows!.map(row => (Number(changedRowId) !== row.id ? row : { ...row, selected })));
      }
    },
    [rows, onChangeSelection]
  );

  const handleChangeSelectionAll = useCallback(
    (event: CustomEvent) => {
      if (onChangeSelectionAll) {
        onChangeSelectionAll(event);
      }
      const { defaultPrevented, detail } = event;
      if (!defaultPrevented) {
        const { selected } = detail;
        setRows(
          rows!.map(row =>
            debouncedSearchString && !doesRowMatchSearchString(row, debouncedSearchString) ? row : { ...row, selected }
          )
        );
      }
    },
    [rows, debouncedSearchString, onChangeSelectionAll]
  );

  const handleChangeSort = useCallback(
    (event: CustomEvent) => {
      if (onSort) {
        onSort(event);
      }
      const { defaultPrevented, detail, target } = event;
      if (!defaultPrevented) {
        const { columnId } = (target as HTMLElement).dataset;
        const { sortDirection: direction } = detail;
        if (direction === TABLE_SORT_DIRECTION.NONE && columnId !== 'name') {
          // Resets the sorting, given non-primary sorting column has got in non-sorting state
          setSortInfo(propSortInfo);
        } else {
          // Sets the sorting as user desires
          setSortInfo({
            columnId: columnId!,
            direction,
          });
        }
      }
    },
    [propSortInfo, onSort]
  );

  const handleChangeStart = useCallback(({ detail }: CustomEvent) => {
    setStart(detail.start);
  }, []);

  const handleDeleteRows = useCallback(() => {
    setRows(rows.filter(row => !row.selected || !doesRowMatchSearchString(row, debouncedSearchString)));
  }, [rows, debouncedSearchString]);

  const handleDownloadRows = useCallback(
    ({ target }: MouseEvent) => {
      const blob = new Blob([JSON.stringify(filteredRows.filter(row => row.selected))], { type: 'application/json' });
      (target as BXBtnElement).href = URL.createObjectURL(blob);
      handleCancelSelection();
    },
    [filteredRows]
  );

  const pagination =
    typeof pageSize === 'undefined' ? (
      undefined
    ) : (
      <BXPagination
        page-size={pageSize}
        start={adjustedStart}
        total={filteredRows.length}
        onAfterChangeCurrent={handleChangeStart}>
        <BXPageSizesSelect slot="page-sizes-select" onAfterChange={handleChangePageSize}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </BXPageSizesSelect>
        <BXPagesSelect />
      </BXPagination>
    );

  /* eslint-disable no-script-url */
  return (
    <div>
      <BXTableToolbar>
        <BXTableBatchActions
          active={hasBatchActions}
          selectedRowsCount={selectedRowsCountInFiltered}
          onAfterClickCancel={handleCancelSelection}>
          <BXBtn onClick={handleDeleteRows}>
            Delete <Delete16 slot="icon" />
          </BXBtn>
          <BXBtn onClick={handleDownloadRows} href="javascript:void 0" download="table-data.json">
            Download <Download16 slot="icon" />
          </BXBtn>
        </BXTableBatchActions>
        <BXTableToolbarContent hasBatchActions={hasBatchActions}>
          <BXTableToolbarSearch onAfterInput={handleChangeSearchString}></BXTableToolbarSearch>
          <BXOverflowMenu>
            <Settings16 slot="icon" />
            <BXOverflowMenuBody>
              <BXOverflowMenuItem>Action 1</BXOverflowMenuItem>
              <BXOverflowMenuItem>Action 2</BXOverflowMenuItem>
              <BXOverflowMenuItem>Action 3</BXOverflowMenuItem>
            </BXOverflowMenuBody>
          </BXOverflowMenu>
          <BXBtn>Primary Button</BXBtn>
        </BXTableToolbarContent>
      </BXTableToolbar>
      <BXTable size={size}>
        <BXTableHead>
          <BXTableHeaderRow
            selected={selectedAllInFiltered}
            selectionName={selectionAllName}
            selectionValue={selectionAllName}
            onBeforeChangeSelection={handleChangeSelectionAll}>
            {columns.map(({ id: columnId, sortCycle, title }) => {
              const sortDirectionForThisCell =
                sortCycle && (columnId === sortColumnId ? sortDirection : TABLE_SORT_DIRECTION.NONE);
              return (
                <BXTableHeaderCell
                  key={columnId}
                  sortCycle={sortCycle}
                  sort-direction={sortDirectionForThisCell}
                  data-column-id={columnId}
                  onBeforeSort={handleChangeSort}>
                  {title}
                </BXTableHeaderCell>
              );
            })}
          </BXTableHeaderRow>
        </BXTableHead>
        <BXTableBody zebra={zebra}>
          {sortedRows.slice(adjustedStart, adjustedStart! + (typeof pageSize === 'undefined' ? Infinity : pageSize)).map(row => {
            const { id: rowId, selected } = row;
            const selectionName = !hasSelection ? undefined : `__bx-ce-demo-data-table_${elementId}_${rowId}`;
            const selectionValue = !hasSelection ? undefined : 'selected';
            return (
              <BXTableRow
                key={rowId}
                selected={hasSelection && selected}
                selectionName={selectionName}
                selectionValue={selectionValue}
                data-row-id={rowId}
                onBeforeChangeSelection={handleChangeSelection}>
                {columns.map(({ id: columnId }) => (
                  <BXTableCell key={columnId}>{row[columnId]}</BXTableCell>
                ))}
              </BXTableRow>
            );
          })}
        </BXTableBody>
      </BXTable>
      {pagination}
    </div>
  );
  /* eslint-enable no-script-url */
};

BXCEDemoDataTable.propTypes = {
  /**
   * The g11n collator to use.
   */
  collator: PropTypes.shape({}),

  /**
   * Data table columns.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      sortCycle: PropTypes.string,
    })
  ),

  /**
   * Data table rows.
   */
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      selected: PropTypes.bool,
    })
  ),

  /**
   * Table sorting info.
   */
  sortInfo: PropTypes.shape({
    columnId: PropTypes.string,
    direction: PropTypes.string,
  }),

  /**
   * `true` if the the table should support selection UI. Corresponds to the attribute with the same name.
   */
  hasSelection: PropTypes.bool,

  /**
   * Number of items per page.
   */
  pageSize: PropTypes.number,

  /**
   * `true` if the the table should use the compact version of the UI. Corresponds to the attribute with the same name.
   */
  size: PropTypes.string,

  /**
   * The row number where current page start with, index that starts with zero. Corresponds to the attribute with the same name.
   */
  start: PropTypes.number,

  /**
   * `true` if the zebra stripe should be shown.
   */
  zebra: PropTypes.bool,

  /**
   * An event that fires when user changes selection of a row.
   */
  onChangeSelection: PropTypes.func,

  /**
   * An event that fires when user changes selection of all rows.
   */
  onChangeSelectionAll: PropTypes.func,

  /**
   * An event that fires when sorting changes.
   */
  onSort: PropTypes.func,
};

BXCEDemoDataTable.defaultProps = {
  collator: new Intl.Collator(),
  hasSelection: false,
  size: TABLE_SIZE.REGULAR,
  start: 0,
};

export const defaultStory = ({ parameters }) => {
  const { size } = parameters?.props?.['bx-table'];
  return (
    <bx-table size={size}>
      <bx-table-head>
        <bx-table-header-row>
          <bx-table-header-cell>Name</bx-table-header-cell>
          <bx-table-header-cell>Protocol</bx-table-header-cell>
          <bx-table-header-cell>Port</bx-table-header-cell>
          <bx-table-header-cell>Rule</bx-table-header-cell>
          <bx-table-header-cell>Attached Groups</bx-table-header-cell>
          <bx-table-header-cell>Status</bx-table-header-cell>
        </bx-table-header-row>
      </bx-table-head>
      <bx-table-body>
        <bx-table-row>
          <bx-table-cell>Load Balancer 1</bx-table-cell>
          <bx-table-cell>HTTP</bx-table-cell>
          <bx-table-cell>80</bx-table-cell>
          <bx-table-cell>Round Robin</bx-table-cell>
          <bx-table-cell>Maureen's VM Groups</bx-table-cell>
          <bx-table-cell>Active</bx-table-cell>
        </bx-table-row>
        <bx-table-row>
          <bx-table-cell>Load Balancer 2</bx-table-cell>
          <bx-table-cell>HTTP</bx-table-cell>
          <bx-table-cell>80</bx-table-cell>
          <bx-table-cell>Round Robin</bx-table-cell>
          <bx-table-cell>Maureen's VM Groups</bx-table-cell>
          <bx-table-cell>Active</bx-table-cell>
        </bx-table-row>
        <bx-table-row>
          <bx-table-cell>Load Balancer 3</bx-table-cell>
          <bx-table-cell>HTTP</bx-table-cell>
          <bx-table-cell>80</bx-table-cell>
          <bx-table-cell>Round Robin</bx-table-cell>
          <bx-table-cell>Maureen's VM Groups</bx-table-cell>
          <bx-table-cell>Active</bx-table-cell>
        </bx-table-row>
      </bx-table-body>
    </bx-table>
  );
};

defaultStory.story = baseDefaultStory.story;

export const sortable = ({ parameters }) => {
  const {
    'bx-table': tableProps,
    'bx-table-body': tableBodyProps,
    'bx-table-row': tableRowProps,
    'bx-table-header-cell': tableHeaderCellProps,
  } = parameters.props || ({} as typeof parameters.props);
  const { size } = tableProps || ({} as typeof tableProps);
  const { zebra } = tableBodyProps || ({} as typeof tableBodyProps);
  const { hasSelection, disableChangeSelection } = tableRowProps || ({} as typeof tableRowProps);
  const { disableChangeSort } = tableHeaderCellProps || ({} as typeof tableHeaderCellProps);
  const beforeChangeSelectionAction = action('onBeforeChangeSelection');
  const beforeChangeSelectionAllAction = action('onBeforeChangeSelection (for selecting all rows)');
  const beforeChangeSelectionHandler = (event: CustomEvent) => {
    if (event.type === 'bx-table-change-selection-all') {
      beforeChangeSelectionAllAction(event);
    } else {
      beforeChangeSelectionAction(event);
    }
    if (disableChangeSelection) {
      event.preventDefault();
    }
  };
  const beforeChangeSortAction = action('onBeforeSort');
  const beforeChangeSortHandler = (event: CustomEvent) => {
    beforeChangeSortAction(event);
    if (disableChangeSort) {
      event.preventDefault();
    }
  };
  return (
    <>
      {/* Refer to <bx-ce-demo-data-table> implementation at the top for details */}
      <BXCEDemoDataTable
        columns={demoColumns}
        rows={demoRows}
        sortInfo={demoSortInfo}
        hasSelection={hasSelection}
        size={size}
        zebra={zebra}
        onChangeSelection={beforeChangeSelectionHandler}
        onChangeSelectionAll={beforeChangeSelectionHandler}
        onSort={beforeChangeSortHandler}
      />
    </>
  );
};

sortable.story = baseSortable.story;

export const sortableWithPagination = ({ parameters }) => {
  const {
    'bx-table': tableProps,
    'bx-table-body': tableBodyProps,
    'bx-table-row': tableRowProps,
    'bx-table-header-cell': tableHeaderCellProps,
  } = parameters.props || ({} as typeof parameters.props);
  const { size } = tableProps || ({} as typeof tableProps);
  const { zebra } = tableBodyProps || ({} as typeof tableBodyProps);
  const { hasSelection, disableChangeSelection } = tableRowProps || ({} as typeof tableRowProps);
  const { disableChangeSort } = tableHeaderCellProps || ({} as typeof tableHeaderCellProps);
  const beforeChangeSelectionAction = action('onBeforeChangeSelection');
  const beforeChangeSelectionAllAction = action('onBeforeChangeSelection (for selecting all rows)');
  const beforeChangeSelectionHandler = (event: CustomEvent) => {
    if (event.type === 'bx-table-change-selection-all') {
      beforeChangeSelectionAllAction(event);
    } else {
      beforeChangeSelectionAction(event);
    }
    if (disableChangeSelection) {
      event.preventDefault();
    }
  };
  const beforeChangeSortAction = action('onBeforeSort');
  const beforeChangeSortHandler = (event: CustomEvent) => {
    beforeChangeSortAction(event);
    if (disableChangeSort) {
      event.preventDefault();
    }
  };
  return (
    <>
      {/* Refer to <bx-ce-demo-data-table> implementation at the top for details */}
      <BXCEDemoDataTable
        columns={demoColumns}
        rows={demoRowsMany}
        sortInfo={demoSortInfo}
        hasSelection={hasSelection}
        pageSize={5}
        size={size}
        start={0}
        zebra={zebra}
        onChangeSelection={beforeChangeSelectionHandler}
        onChangeSelectionAll={beforeChangeSelectionHandler}
        onSort={beforeChangeSortHandler}
      />
    </>
  );
};

sortableWithPagination.story = baseSortableWithPagination.story;
