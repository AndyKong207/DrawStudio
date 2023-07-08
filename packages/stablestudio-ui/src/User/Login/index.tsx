import axios from "axios";
import sha256 from "crypto-js/sha256";
import { Link } from "react-router-dom";
import { Theme } from "~/Theme";

function hash(password: string) {
  const salt = "G3AlV9e9ohT/0zKaFB5JzxRQUAw";
  return sha256(password + salt).toString();
}

// captcha 是腾讯人机验证码前端校验方法，调用前先引入 <script src="https://ssl.captcha.qq.com/TCaptcha.js"></script>
// 这个方法返回的 ticket, randstr 参数，一些敏感接口（登录注册等）需要一并传入
// 具体可以看接口文档 https://gist.github.com/iwestlin/af842ea44ac7fd6401ad7c8c6cb63c8a
function captcha() {
  const { TencentCaptcha } = window as any;
  return new Promise((resolve, reject) => {
    try {
      const captcha = new TencentCaptcha(
        "192124353",
        (res: any) => {
          if (res.ret === 0) {
            const { ticket, randstr } = res;
            resolve({ ticket, randstr });
          } else {
            console.log("验证失败:", res);
            // Message.warning({ content: "用户行为验证未通过" });
            reject(new Error("用户行为验证未通过"));
          }
        },
        {}
      );
      captcha.show();
    } catch (err) {
      // Message.warning({ content: "验证码加载失败，请联系网站管理员" });
      reject(err);
    }
  });
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .post("/api/user/check")
      .then((r) => {
        if (r.data) {
          setTimeout(() => {
            window.location.href = "/generate";
          }, 500);
        }
      })
      .catch(console.error);
  }, []);

  const handleLogin = () => {
    setLoading(true);
    console.log(email);
    captcha()
      .then((res: any) =>
        axios.post("/api/user/login", {
          ...res, // 即 ticket, randstr
          email,
          password: hash(password),
        })
      )
      .then(() => {
        // Message.success("登录成功，跳转到主页...");
        window.location = '/'
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
      });
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
      <div className="h-[300px] w-[400px] rounded-lg p-6 shadow-lg dark:bg-zinc-800">
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
