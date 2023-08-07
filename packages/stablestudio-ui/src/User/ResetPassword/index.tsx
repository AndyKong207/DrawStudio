import { Link } from "react-router-dom";
import { Theme } from "~/Theme";

const Login = () => {
  const [email, setEmail] = useState("");

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-950">
      <div className="h-[230px] w-[400px] rounded-lg p-6 shadow-lg dark:bg-zinc-800">
        <div className="mb-4 flex-col items-center justify-center text-center">
          <div className="text-2xl">忘记密码？</div>
          <div>输入您的注册邮箱，我们会发送确认邮件来重置您的密码</div>
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
          <Theme.Button color="brand" fullWidth size="lg" className="mb-2">
            找回密码
          </Theme.Button>
        </form>
        <Link
          className="text-brand-400 mt-6 block text-center hover:underline"
          to="/signin"
        >
          返回DrawStudio
        </Link>
      </div>
    </div>
  );
};

export default Login;
