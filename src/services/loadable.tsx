import Loadable from "react-loadable";
import Loading from "components/loading";

const ReactLoadable = (loader: () => Promise<any>) =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loading />
  });

export default ReactLoadable;
