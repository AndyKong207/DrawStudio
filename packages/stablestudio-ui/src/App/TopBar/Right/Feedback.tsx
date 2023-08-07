import { GlobalState } from "~/GlobalState";

export function Feedback() {
  const { isOpen, setIsOpen } = Feedback.use();
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);
  // const toggle = useCallback(
  //   () => "toggle" && setIsOpen(!isOpen),
  //   [isOpen, setIsOpen]
  // );

  return useMemo(
    () =>
      !isOpen ? null : (
        <div
          ref={ref}
          className="fixed bottom-0 left-0 right-0 top-0 z-[9999] flex h-full w-full items-center justify-center"
        >
          <div
            onClick={close}
            className="absolute bottom-0 left-0 right-0 top-0 z-0 bg-zinc-900/50 opacity-100 backdrop-blur-sm"
          />
          <div className="relative">
            <div className="z-30 w-[400px] rounded bg-zinc-200 text-black shadow-lg dark:bg-zinc-800/90 dark:text-white">
              <img
                className="w-full"
                src="https://draw-1304100014.cos.ap-shanghai.myqcloud.com/%E6%8A%96%E9%9F%B3%E5%9B%BE%E7%89%87/%E6%8A%96%E9%9F%B3%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg"
              />
            </div>
          </div>
        </div>
      ),
    [isOpen, close]
  );
}

export namespace Feedback {
  export type State = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  };
  export const use = GlobalState.create<State>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
  }));
}
