import { Generation } from "~/Generation";
import { Theme } from "~/Theme";

export namespace Create {
  export function Button(props: Generation.Image.Create.Button.Props) {
    return (
      <div className="pointer-events-auto mr-auto flex flex-row items-center gap-1">
        <Theme.Tooltip
          placement="top"
          content={
            <div className="-mr-1 flex flex-row items-center gap-2">
              <p>以此生成变体</p>
            </div>
          }
        >
          <Generation.Image.Create.Button
            {...props}
            noBadge
            size="md"
            icon={Theme.Icon.Variation}
          >
            {!props.noTitle && <>变化</>}
          </Generation.Image.Create.Button>
        </Theme.Tooltip>
      </div>
    );
  }
}
