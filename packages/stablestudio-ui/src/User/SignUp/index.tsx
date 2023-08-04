import { Link } from "react-router-dom";
import { captcha, signup } from "~/api/modules/user";
import { Router } from "~/Router";
import { Theme } from "~/Theme";
import { hash } from "~/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = Router.useNavigate();
  const [loading, setLoading] = useState(false);
  const [isShowPwd, setIsShowPwd] = useState(false);

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  const handleShowPassword = () => {
    setIsShowPwd(!isShowPwd);
  };

  const handleRegister = async () => {
    setLoading(true);
    const captchaResp: any = await captcha();
    const resp = await signup({
      ...captchaResp, // 即 ticket, randstr
      email,
      password: hash(password),
    }).catch((e) => {
      setLoading(false);
      console.error(e);
    });
    if (resp) {
      navigate("/signin");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-950">
      <div className="h-[300px] w-[400px] rounded-lg p-6 shadow-lg dark:bg-zinc-800">
        <div className="mb-4 flex-col items-center justify-center text-center">
          <div className="text-2xl">欢迎</div>
          <div>注册DrawStudio</div>
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
          className="mb-6 h-12"
          size="lg"
          placeholder="密码"
          type={isShowPwd ? "text" : "password"}
          iconRight={Theme.Icon.Eye}
          onRightIconClick={handleShowPassword}
        />
        <Theme.Button
          loading={loading}
          color="brand"
          fullWidth
          size="lg"
          className="mb-2"
          onClick={handleRegister}
        >
          注册
        </Theme.Button>
        <p className="t text-gray-400">
          已经有账号？
          <Link className="text-brand-400 hover:underline" to="/signin">
            去登录
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
