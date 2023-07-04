import { Link } from "react-router-dom";
import { Theme } from "~/Theme";

const Login = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    setCode(value);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-950">
      <div className="h-[300px] w-[400px] rounded-lg p-6 shadow-lg dark:bg-zinc-800">
        <div className="mb-4 flex-col items-center justify-center text-center">
          <div className="text-2xl">欢迎</div>
          <div>登录DrawStudio</div>
        </div>
        <form>
          <div className="flex space-x-2">
            <Theme.Input
              value={email}
              onChange={handleEmail}
              className="mb-4 h-12"
              size="lg"
              placeholder="手机号"
              type="text"
            />
            <Theme.Button color="brand" className="h-12">
              发送验证码
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
          <Theme.Button color="brand" fullWidth size="lg" className="mb-2 mt-4">
            登录
          </Theme.Button>
        </form>
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
