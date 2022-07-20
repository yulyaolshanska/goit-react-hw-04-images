import { Circles } from 'react-loader-spinner';
import { LoaderBox } from './loader.steled';

export function Loader() {
  return (
    <LoaderBox>
      <Circles height="100" width="100" color="grey" ariaLabel="loading" />
    </LoaderBox>
  );
}
