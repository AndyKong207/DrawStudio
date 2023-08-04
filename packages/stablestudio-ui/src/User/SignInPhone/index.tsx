import { Link } from "react-router-dom";
import { captcha, loginSms, sendSms } from "~/api/modules/user";
import { Router } from "~/Router";
import { Theme } from "~/Theme";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = Router.useNavigate();
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

  const handleLogin = async () => {
    setLoading(true);
    const captchaResp: any = await captcha();
    const resp = await loginSms({
      ...captchaResp, // 即 ticket, randstr
      phone,
      code,
    }).catch((e) => {
      setLoading(false);
      console.error(e);
    });
    if (resp) {
      navigate("/generate");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-950">
      <div className="h-[300px] w-[400px] rounded-lg p-6 shadow-lg dark:bg-zinc-800">
        <div className="mb-4 flex-col items-center justify-center text-center">
          <div className="text-2xl">欢迎</div>
          <div>登录DrawStudio</div>
        </div>
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
          onClick={handleLogin}
        >
          登录
        </Theme.Button>
        <div className="flex justify-between ">
          <p className="text-gray-400">
            还没有账号？
            <Link className="text-brand-400 hover:underline" to="/signup">
              去注册
            </Link>
          </p>
          <Link className="text-brand-400 hover:underline" to="/signin">
            账号密码登录
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
