import { Link } from "react-router-dom";
import { Theme } from "~/Theme";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <div className="h-[300px] w-[400px] rounded-lg p-6 shadow-lg dark:bg-zinc-800">
        <div className="mb-4 flex-col items-center justify-center text-center">
          <div className="text-2xl">欢迎</div>
          <div>登录DrawStudio</div>
        </div>
        <form>
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
            type="password"
            // iconRight={Theme.Icon.Eye}
            onRightIconClick={handleShowPassword}
          />
          <Theme.Button color="brand" fullWidth size="lg" className="mb-2">
            登录
          </Theme.Button>
        </form>
        <p className="t text-gray-400">
          还没有账号？
          <Link className="text-brand-400 hover:underline" to="/">
            去注册
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
