import { createClient } from "@liveblocks/client";
import { enhancer } from "@liveblocks/redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

export const client = createClient({
  publicApiKey: "pk_dev_qZcKTtQljUPplWCfF2JpZ0qWlCFAzIsz4gLHL5Mg08BxggnpLd6cCzXNV09hUHzE",
});

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomColor() {
  return COLORS[getRandomInt(COLORS.length)];
}

const initialState = {
  shapes: {},
};

const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    insertRectangle: (state) => {
        const shapeId = Date.now().toString();
        const shape = {
          x: getRandomInt(300),
          y: getRandomInt(300),
          fill: getRandomColor(),
        };
        state.shapes[shapeId] = shape;
      },
  },
});

export const { insertRectangle } = slice.actions;

export function makeStore() {
  return configureStore({
    reducer: slice.reducer,
    enhancers: [
      enhancer({
        client,
        storageMapping: { shapes: true },
      }),
    ],
  });
}

const store = makeStore();

export default store;