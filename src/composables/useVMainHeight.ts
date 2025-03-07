import { useLayout } from "vuetify";

export function useVMainHeight(): globalThis.Ref<number> {
  let margin = 0;
  const height = ref(0);

  const onResize = (): void => {
    height.value = window.innerHeight - margin;
  };

  onMounted(() => {
    const mh = useLayout().mainRect.value;
    margin = mh.bottom + mh.top;
    onResize();
    window.addEventListener("resize", onResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });

  return height;
}
