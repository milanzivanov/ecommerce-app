async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;

  return <div>Search results for: {query}</div>;
}
export default SearchPage;
