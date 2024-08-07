import { useSearchParams } from 'react-router-dom';

function useUrlLocation() {
  const [searchParams] = useSearchParams();
  const Lat = searchParams.get('lat');
  const Lng = searchParams.get('lng');
  return [Lat, Lng];
}

export default useUrlLocation;
