import React from "react";
import { useAppSelector } from "../../config/hookRedux";

const useLoadingListener = (loadingKey: string) => {
  const [loading, setLoading] = React.useState(false);
  const loading_stack = useAppSelector((state) => state.state.loading);
  const keyArr = loadingKey.split(",");
  React.useEffect(() => {
    if (keyArr.some((key) => loading_stack.includes(key))) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading_stack]);
  return loading;
};

export default useLoadingListener;
