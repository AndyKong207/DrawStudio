import { Generation } from "~/Generation";
import { Theme } from "~/Theme";

import { Display } from "./Display";
import { Ratio, Ratios } from "./Ratio";

export function Size({ id }: { id?: ID }) {
  const [fullControl, setFullControl] = useState(false);
  const toggleFullControl = useCallback(
    () => setFullControl((fullControl) => false ?? !fullControl),
    []
  );

  const { setInput, input } = Generation.Image.Input.use(id);
  const bounds = Size.Bounds.use(id);

  const onWidthChange = useCallback(
    (width: number) => {
      setInput((input) => {
        input.width = width;
      });
    },
    [setInput]
  );

  const onHeightChange = useCallback(
    (height: number) => {
      setInput((input) => {
        input.height = height;
      });
    },
    [setInput]
  );

  if (!bounds || !input) return null;
  return (
    <>
      <Generation.Image.Size.Ratio
        id={id}
        fullControl={fullControl}
        toggleFullControl={toggleFullControl}
      />

      <div
        className={classes(
          "hidden grid-cols-2 items-end gap-8",
          fullControl && "grid"
        )}
      >
        <Theme.Slider
          title="Width"
          disabled={bounds.width.max === 0}
          min={bounds.width.min}
          value={input.width}
          max={bounds.width.max}
          onChange={onWidthChange}
        />
        <Theme.Slider
          title="Height"
          disabled={bounds.width.max === 0}
          min={bounds.height.min}
          value={input.height}
          max={bounds.height.max}
          onChange={onHeightChange}
        />
      </div>
    </>
  );
}

export declare namespace Size {
  export { Display, Ratio, Ratios };
}

export namespace Size {
  Size.Display = Display;
  Size.Ratio = Ratio;
  Size.Ratios = Ratios;

  export type Bounds = {
    length: { min: number; max: number };
    area: { max: number };
  };

  export namespace Bounds {
    export const get = (input: Generation.Image.Input) => {
      if (!input?.model) return undefined;
      // https://platform.stability.ai/docs/api-reference#tag/v1generation/operation/textToImage
      // For SDXL v0.9: valid dimensions are 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640, 640x1536, 768x1344, 832x1216, or 896x1152
      // For SDXL v1.0: valid dimensions are the same as SDXL v0.9
      if (input.model === "stable-diffusion-xl-1024-v1-0") {
        return {
          length: {
            min: 1024,
            max: 1024,
          },

          area: {
            min: 1024 * 1024,
            max: 1024 * 1024,
          },

          ratio: {
            min: 1,
            max: 1,
          },

          width: {
            min: 1024,
            max: 1024,
          },

          height: {
            min: 1024,
            max: 1024,
          },
        };
      } else if (input.model.includes("xl")) {
        return {
          length: {
            min: 512,
            max: 896,
          },

          area: {
            max: 512 * 896,
          },

          ratio: {
            min: 0.57,
            max: 1.75,
          },

          width: {
            min: 512,
            max: 896,
          },

          height: {
            min: 512,
            max: 896,
          },
        };
      }

      const maxArea = 1024 * 1024;
      const maxLength = 2048;
      const minLength = Generation.Image.Model.StableDiffusionV1.baseResolution(
        input.model
      );

      return {
        length: {
          min: minLength,
          max: maxLength,
        },

        width: {
          min: minLength,
          max: maxArea / input.height,
        },

        height: {
          min: minLength,
          max: maxArea / input.width,
        },

        area: {
          min: minLength * minLength,
          max: maxArea,
        },

        ratio: {
          min: minLength / maxLength,
          max: maxLength / minLength,
        },
      };
    };

    export const use = (id?: ID) => {
      const { input } = Generation.Image.Input.use(id);

      return useMemo(() => input && get(input), [input]);
    };
  }
}
