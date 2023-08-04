import { Link } from "react-router-dom";
import { captcha, check, loginApi } from "~/api/modules/user";
import { Router } from "~/Router";
import { Theme } from "~/Theme";
import { hash } from "~/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = Router.useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleCheck();
  }, []);

  const handleCheck = async () => {
    const resp = await check().catch(console.error);
    if (resp) {
      navigate("/generate");
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const captchaResp: any = await captcha();
    const resp = await loginApi({
      ...captchaResp, // 即 ticket, randstr
      email,
      password: hash(password),
    }).catch((e) => {
      setLoading(false);
      console.error(e);
    });
    if (resp) {
      window.location.reload();
      // navigate("/generate");
    }
  };

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  const handleShowPassword = () => {
    console.log("first");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-950">
      <div className="h-[320px] w-[400px] rounded-lg p-6 shadow-lg dark:bg-zinc-800">
        <div className="mb-4 flex-col items-center justify-center text-center">
          <div className="text-2xl">欢迎</div>
          <div>登录DrawStudio</div>
        </div>
        <Theme.Input
          value={email}
          onChange={handleEmail}
          className="mb-4 h-12"
          size="lg"
          placeholder="邮箱"
          type="email"
        />
        <Theme.Input
          value={password}
          onChange={handlePassword}
          className="mb-4 h-12"
          size="lg"
          placeholder="密码"
          type="password"
          // iconRight={Theme.Icon.Eye}
          onRightIconClick={handleShowPassword}
        />
        <Link className="text-brand-400 hover:underline" to="/reset-password">
          忘记密码？
        </Link>
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
          <Link className="text-brand-400 hover:underline" to="/signin-sms">
            短信验证码登录
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
