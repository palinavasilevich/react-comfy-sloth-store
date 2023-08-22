import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };
    }

    case SET_GRIDVIEW: {
      return { ...state, isGridView: true };
    }

    case SET_LISTVIEW: {
      return { ...state, isGridView: false };
    }

    case UPDATE_SORT: {
      return { ...state, sort: action.payload };
    }

    case SORT_PRODUCTS: {
      const { sort, filteredProducts } = state;
      let tempProducts = [...filteredProducts];

      if (sort === "price-lowest") {
        tempProducts.sort((a, b) => a.price - b.price);
      }

      if (sort === "price-highest") {
        tempProducts.sort((a, b) => b.price - a.price);
      }

      if (sort === "name-a") {
        tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }

      if (sort === "name-z") {
        tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      return { ...state, filteredProducts: tempProducts };
    }

    case UPDATE_FILTERS: {
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    }

    case FILTER_PRODUCTS: {
      const { allProducts } = state;
      const { text, category, company, color, price, shipping } = state.filters;
      let tempProducts = [...allProducts];

      if (text) {
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        );
      }

      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }

      if (company !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }

      if (color !== "all") {
        tempProducts = tempProducts.filter((product) =>
          product.colors.find((c) => c === color)
        );
      }

      if (price) {
        tempProducts = tempProducts.filter((product) => product.price <= price);
      }

      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping === true
        );
      }

      return { ...state, filteredProducts: tempProducts };
    }

    case CLEAR_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.maxPrice,
          shipping: false,
        },
      };
    }

    default: {
      return state;
    }
  }

  // throw new Error(`No Matching "${action.type}" - action type`)
};

export default filter_reducer;
