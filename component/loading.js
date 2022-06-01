import { Loading } from "@nextui-org/react";
import loading from "../styles/Loading.module.css";
const LoadOverlay = () => {
  return (
    <div className={loading.box}>
      <Loading />
    </div>
  );
};

export default LoadOverlay;
