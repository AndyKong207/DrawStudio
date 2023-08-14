import { Link } from "react-router-dom";
import { captcha, forgot } from "~/api/modules/user";
import { Theme } from "~/Theme";
import { notify } from "~/utils/noti";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const timer = useRef<any>();
  const [counter, setCounter] = useState(60);

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handleReset = async () => {
    setLoading(true);
    const captchaResp: any = await captcha();
    const resp = await forgot({
      ...captchaResp, // 即 ticket, randstr
      email,
    }).catch((e) => {
      setLoading(false);
      console.error(e);
    });
    if (resp) {
      notify(`已发送找回密码链接到您的邮箱 ${email}`, "success");
      timer.current = setInterval(() => {
        setCounter((prevCount) => {
          if (prevCount <= 0) {
            clearInterval(timer.current);
            setLoading(false);
            return 60;
          }
          return prevCount - 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-950">
      <div className="h-[230px] w-[400px] rounded-lg p-6 shadow-lg dark:bg-zinc-800">
        <div className="mb-4 flex-col items-center justify-center text-center">
          <div className="text-2xl">忘记密码？</div>
          <div>输入您的注册邮箱，我们会发送确认邮件来重置您的密码</div>
        </div>
        <Theme.Input
          value={email}
          onChange={handleEmail}
          className="mb-4 h-12"
          size="lg"
          placeholder="邮箱"
          type="email"
        />
        <Theme.Button
          loading={loading}
          color="brand"
          fullWidth
          size="lg"
          className="mb-2"
          onClick={handleReset}
          disabled={!email}
        >
          找回密码
          {counter < 60 ? <span>| {counter}秒后可再次发送</span> : null}
        </Theme.Button>
        <Link
          className="text-brand-400 mt-6 block text-center hover:underline"
          to="/signin"
        >
          返回登录
        </Link>
      </div>
    </div>
  );
};

export default Login;
