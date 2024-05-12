import Spinner from "../spinner";

export function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center z-50">
        <Spinner />
    </div>
  );
};