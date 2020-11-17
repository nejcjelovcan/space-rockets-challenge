import useSWR, { useSWRInfinite } from "swr";

export const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return await response.json();
};

export function getSpaceXUrl(path, options) {
  const searchParams = new URLSearchParams();
  for (const property in options) {
    searchParams.append(property, options[property]);
  }

  const spaceXApiBase = process.env.NEXT_PUBLIC_SPACEX_API_URL;
  return `${spaceXApiBase}${path}?${searchParams.toString()}`;
}

export function useSpaceX(path, options, initialData) {
  const endpointUrl = getSpaceXUrl(path, options);
  return useSWR(path ? endpointUrl : null, fetcher, { initialData });
}

export function useSpaceXPaginated(path, options, initialData) {
  return useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) {
        return null;
      }
      return getSpaceXUrl(path, {
        ...options,
        offset: options.limit * pageIndex,
      });
    },
    fetcher,
    { initialData }
  );
}
