import { memo } from "react";
import Draggable from "react-draggable";
import Detail from "./Detail";

type PopupProps = {
  coin: string;
  position: { x: number; y: number };
  onClose: (coin: string) => void;
};

function Popup({ coin, position, onClose }: PopupProps): JSX.Element {
  return (
    <Draggable key={coin} defaultPosition={position}>
      <div className="draggable-container">
        <Detail onClose={onClose} coin={coin} />
      </div>
    </Draggable>
  );
}

export default memo(Popup);
