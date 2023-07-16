import { Logo } from ".";

export function Next() {
  return (
    <div className="flex items-center gap-1.5">
      {/* <Logo /> */}
      <div className="flex flex-col">
        <span className="text-lg font-medium">般若绘画AI</span>
        <span className="-mt-1 text-xs font-light">banruoai.com</span>
      </div>
    </div>
  );
}
