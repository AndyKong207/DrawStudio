import { Next } from "./Next";

export function Logo(props: JSX.IntrinsicElements["img"]) {
  return (
    <img className="h-10 w-10" src="./pineapple.png" alt="Logo" {...props} />
  );
}

Logo.Next = Next;
