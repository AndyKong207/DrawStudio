import { App } from "~/App";
import { Generation } from "~/Generation";
import { Theme } from "~/Theme";

export function Advanced({
  id,
  ...props
}: App.Sidebar.Section.Props & { id: ID }) {
  const { setInput, input } = Generation.Image.Input.use(id);
  const areModelsEnabled = true; // Generation.Image.Models.useAreEnabled();
  const areSamplersEnabled = true; //Generation.Image.Samplers.useAreEnabled();

  const onPromptStrengthChange = useCallback(
    (cfgScale: number) => {
      setInput((input) => {
        input.cfgScale = cfgScale;
      });
    },
    [setInput]
  );

  const onStepsChange = useCallback(
    (steps: number) => {
      setInput((input) => {
        input.steps = steps;
      });
    },
    [setInput]
  );

  const onSeedNumberChange = useCallback(
    (seed: number) =>
      setInput((input) => {
        input.seed = seed;
      }),
    [setInput]
  );

  const onSeedChange = useCallback(
    (value: string) =>
      setInput((input) => {
        if (value === "") input.seed = 0;
      }),
    [setInput]
  );

  if (!input) return null;
  return (
    <App.Sidebar.Section
      title="进阶设置"
      divider={false}
      collapsable
      icon={(props) =>
        props.expanded
          ? (bp) => (
              <Theme.Icon.EyeOff
                {...bp}
                className={classes(bp.className, "ml-1")}
              />
            )
          : (bp) => (
              <Theme.Icon.Eye
                {...bp}
                className={classes(bp.className, "ml-1")}
              />
            )
      }
      className={(props) => (!props.expanded ? "mb-2" : "")}
      {...props}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-8">
          <Theme.Tooltip
            delay={750}
            placement="right"
            content={
              <h1>
                控制提示词对图象的影响强度
                <br /> 默认（建议）7-8。
              </h1>
            }
          >
            <Theme.NumberInput
              icon={Theme.Icon.Scale}
              label="提示强度"
              placeholder="自动"
              fullWidth
              number
              min={1}
              step={0.1}
              max={30}
              value={input.cfgScale}
              onNumberChange={onPromptStrengthChange}
            />
          </Theme.Tooltip>
          <Theme.Tooltip
            delay={750}
            content={
              <h1>
                控制图象生成的迭代步数，建议30-60， <br />
                步数越多Ai引擎需要越多算力。
              </h1>
            }
            placement="right"
          >
            <Theme.NumberInput
              icon={Theme.Icon.Steps}
              label="迭代步数"
              fullWidth
              number
              min={10}
              step={1}
              max={150}
              value={input.steps}
              onNumberChange={onStepsChange}
            />
          </Theme.Tooltip>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 items-end gap-8">
            <Theme.Tooltip
              delay={750}
              content={
                <h1>
                  图象由初始种子迭代发展而来，相同的参数设定+ <br />
                  相同的种子会产生非常相似的画面。
                </h1>
              }
              placement="right"
            >
              <Theme.NumberInput
                icon={Theme.Icon.Sprout}
                placeholder="自动"
                label="种子"
                fullWidth
                number
                min={1}
                step={1}
                max={4294967295}
                value={input.seed !== 0 ? input.seed : ""}
                onChange={onSeedChange}
                onNumberChange={onSeedNumberChange}
                iconRight={(props) =>
                  input.seed !== 0 ? (
                    <Theme.Tooltip content="Clear Seed">
                      <Theme.Icon.X
                        {...props}
                        className={classes(
                          props.className,
                          "cursor-pointer duration-100 hover:opacity-100"
                        )}
                        onClick={() => onSeedNumberChange(0)}
                      />
                    </Theme.Tooltip>
                  ) : null
                }
              />
            </Theme.Tooltip>
          </div>
        </div>
        {areModelsEnabled && (
          <div className="-mx-2">
            <Generation.Image.Model.Dropdown id={id} />
          </div>
        )}
        {areSamplersEnabled && (
          <div className="-mx-2">
            <Generation.Image.Sampler.Dropdown id={id} />
          </div>
        )}
      </div>
    </App.Sidebar.Section>
  );
}
