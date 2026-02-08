import { useQuery, usePaginatedQuery } from "convex/react";
import { api } from "../convex/_generated/api";

/**
 * Frontend component that triggers TS2589.
 *
 * This pattern (useQuery/api pattern with many modules)
 * can cause TS2589 when the internal type is too complex.
 */
export function App() {
  // This pattern can cause TS2589
  const items = useQuery(api.items.list);

  // This pattern can also cause TS2589
  const upcoming = usePaginatedQuery(
    api.items.list,
    {},
    { initialNumItems: 20 },
  );

  return (
    <div>
      {items?.map((item) => (
        <div key={item._id}>{item.name}</div>
      ))}
    </div>
  );
}
