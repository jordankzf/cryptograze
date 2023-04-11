import { memo } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import Detail from "./Detail";

type PopupProps = {
  coin: string;
  position: { x: number; y: number };
  onClose: (coin: string) => void;
};

function Popup({ coin, position, onClose }: PopupProps): JSX.Element {
  return createPortal(
    <Draggable key={coin} defaultPosition={position}>
      <div className="draggable-container">
        <Detail onClose={onClose} coin={coin} />
      </div>
    </Draggable>,
    document.body
  );
}

export default memo(Popup);
