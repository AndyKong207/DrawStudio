/* eslint-disable react-hooks/exhaustive-deps */
import { bindPhone, captcha, sendSms } from "~/api/modules/user";
import { GlobalState } from "~/GlobalState";
import { Theme } from "~/Theme";

export function BindPhone() {
  const { isOpen, setIsOpen } = BindPhone.use();
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = Router.useNavigate();
  const [counter, setCounter] = useState(60);
  const timer = useRef<any>();

  const phoneChange = (value: string) => {
    setPhone(value);
  };

  const handlePassword = (value: string) => {
    setCode(value);
  };

  const handleSendCode = async () => {
    const captchaResp: any = await captcha();
    const resp = true;
    await sendSms({
      ...captchaResp, // 即 ticket, randstr
      phone,
    }).catch((e) => {
      setLoading(false);
      console.error(e);
    });
    if (resp) {
      timer.current = setInterval(() => {
        setCounter((prevCount) => {
          if (prevCount <= 0) {
            clearInterval(timer.current);
            return 60;
          }
          return prevCount - 1;
        });
      }, 1000);
    }
  };

  const handleBind = async () => {
    setLoading(true);
    const captchaResp: any = await captcha();
    const resp = await bindPhone({
      ...captchaResp, // 即 ticket, randstr
      phone,
      code,
    }).catch((e) => {
      setLoading(false);
      console.error(e);
    });
    if (resp) {
      // navigate("/generate");
      window.location.reload();
    }
  };

  return useMemo(
    () =>
      !isOpen ? null : (
        <div
          ref={ref}
          className="fixed bottom-0 left-0 right-0 top-0 z-[9999] flex h-full w-full items-center justify-center"
        >
          <div
            onClick={close}
            className="absolute bottom-0 left-0 right-0 top-0 z-0 bg-zinc-900/50 opacity-0 backdrop-blur-sm"
          />
          <div className="relative">
            <div className="z-30 w-[400px] rounded bg-zinc-200 p-4 text-black shadow-lg dark:bg-zinc-800/90 dark:text-white">
              <div className="mb-4 mt-2 text-center text-2xl">绑定手机号</div>
              <div className="flex space-x-2">
                <Theme.Input
                  value={phone}
                  onChange={phoneChange}
                  className="mb-4 h-12"
                  size="lg"
                  placeholder="手机号"
                  type="text"
                />
                <Theme.Button
                  color="brand"
                  className="h-12"
                  onClick={handleSendCode}
                  disabled={counter !== 60}
                >
                  发送验证码{counter < 60 ? <span>({counter})</span> : null}
                </Theme.Button>
              </div>
              <Theme.Input
                value={code}
                onChange={handlePassword}
                className="mb-4 h-12"
                size="lg"
                placeholder="验证码"
                type="text"
              />
              <Theme.Button
                loading={loading}
                color="brand"
                fullWidth
                size="lg"
                className="mb-2 mt-4"
                onClick={handleBind}
              >
                确认绑定
              </Theme.Button>
            </div>
          </div>
        </div>
      ),
    [isOpen, close, phone, handleSendCode, counter, code, loading, handleBind]
  );
}

export namespace BindPhone {
  export type State = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  };
  export const use = GlobalState.create<State>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
  }));
}
