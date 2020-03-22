export { setCatalog, setCatalogs, catalogLoadingStatus } from './Catalogs-actions';

export { setBrand, setBrands, brandLoadingStatus } from './Brand-actions';

export {
    setCategory,
    setCategories,
    categoryLoadingStatus,
    categoryUpdateCatalogs,
    categoryLoadingStop,
} from './Categories-actions';

export {
    setProduct,
    setProducts,
    setProductsFilters,
    setProductPropetries,
    setProductsReadOnly,
    setProductLoadingStatus,
} from './Products-actions';

export {
    setProductEdit,
    setProductPropetriesEdit,
    setProductGroupedPropetries,
} from './Product-edit-actions';

export { setUsers, setUser, userLoadingStatus } from './Users-actions';

export { setPagesCount, setCurrentPage, setRowsPerPage } from './Paginator-action';

export { setColors } from './Colors-actions';

export { setSnackBarStatus, setSnackBarSeverity, setSnackBarMessage } from './Snackbar-actions';

export {
    setFilterSelected,
    setCheckBoxStatus,
    setFilterOptionsList,
    setFilterOptionsGroups,
    setFilterCounters,
} from './Filters-action';

export { setSearchValue, setSearchTerm } from './Search-actions';

export { setTableDense } from './Table-actions';

export { setThemeMode } from './Theme-actions';

export {
    setDialogStatus,
    setDialogTitle,
    setDialogContent,
    setButtonTitle,
    setEventHandler,
} from './Dialog-window-actions';

export { setDaysValue } from './Charts-actions';

export { setOrder, setOrders, ordersLoadingStatus, setOrderStatus } from './Orders-actions';
