import { BeatLoader } from "react-spinners";

export default function Spinner({ fullWidth }) {
  if (fullWidth) {
    return (
      <div className="w-full flex justify-center ">
        <BeatLoader color={"#16A34A"}></BeatLoader>
      </div>
    );
  }
  return <BeatLoader color={"#16A34A"} speedMultiplier={2} />;
}
