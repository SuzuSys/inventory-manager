import { liveQuery } from "dexie";

type Query<T> = () => Promise<T[]>;

/**
 * A query that would be affected by a modification will rerender - others not.
 * Details: https://dexie.org/docs/liveQuery()
 * @param query Don't call non-Dexie asynchronous API:s directly from it.
 * @returns Ref<T[]>
 */
export function useObservable<T>(query: Query<T>) {
  const t: Ref<T[]> = ref([]);
  const subscription = liveQuery(query).subscribe({
    next: (result) => {
      t.value = result;
    },
    error: (error) => {
      console.log(error);
    },
  });

  onUnmounted(subscription.unsubscribe);

  return t;
}
