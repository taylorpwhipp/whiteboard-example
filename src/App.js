import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@liveblocks/redux";

import { insertRectangle } from "./store";

const roomId = "redux-whiteboard";

export default function App() {
  const shapes = useSelector((state) => state.shapes);
  const isLoading = useSelector((state) => state.liveblocks.isStorageLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      actions.enterRoom(roomId, {
        shapes: {},
      })
    );

    return () => {
      dispatch(actions.leaveRoom(roomId));
    };
  }, [dispatch]);

  if (isLoading) {
    return <div className="loading">Loading</div>;
  }

  return (
    <>
    <div className="canvas">
      {Object.entries(shapes).map(([shapeId, shape]) => {
        return <Rectangle key={shapeId} shape={shape} />;
      })}
    </div>
    <div className="toolbar">
        <button onClick={() => dispatch(insertRectangle())}>Rectangle</button>
    </div>
    </>
  );
}

const Rectangle = ({ shape }) => {
  return (
    <div
      className="rectangle"
      style={{
        transform: `translate(${shape.x}px, ${shape.y}px)`,
        backgroundColor: shape.fill ? shape.fill : "#CCC",
      }}
    ></div>
  );
};