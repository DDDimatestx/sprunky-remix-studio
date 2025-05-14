
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gamepad, ArrowLeft, Trophy, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";

const Auth = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp" | "profile">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный email",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Имитация отправки кода на email
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      
      toast({
        title: "Код отправлен",
        description: `Проверочный код отправлен на ${email}`,
      });
      
      // Для демонстрации сразу показываем код
      toast({
        title: "Demo: Ваш код",
        description: "Используйте код 123456 для входа",
      });
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите 6-значный код",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Имитация проверки кода
    setTimeout(() => {
      setIsLoading(false);
      
      // Для демонстрации любой 6-значный код будет считаться правильным
      if (otp === "123456") {
        // Если пользователь уже зарегистрирован, перенаправляем на главную
        setStep("profile");
        
        toast({
          title: "Код подтвержден",
          description: "Код успешно подтвержден!",
        });
      } else {
        toast({
          title: "Неверный код",
          description: "Пожалуйста, проверьте код и попробуйте снова",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || username.length < 3) {
      toast({
        title: "Ошибка",
        description: "Имя пользователя должно содержать минимум 3 символа",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Имитация сохранения профиля
    setTimeout(() => {
      setIsLoading(false);
      
      // Сохраняем в localStorage для демонстрации
      localStorage.setItem("user", JSON.stringify({
        email,
        username,
        joined: new Date().toISOString(),
      }));
      
      toast({
        title: "Добро пожаловать!",
        description: `${username}, ваш профиль создан успешно!`,
      });
      
      // Перенаправляем на главную
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-game-primary/5 to-game-secondary/10">
      <header className="w-full py-6 border-b border-game-primary/20">
        <div className="container flex items-center justify-between">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Назад
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-center flex items-center gap-3">
            <User className="h-8 w-8 text-game-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
              {step === "email" ? "Авторизация" : 
               step === "otp" ? "Подтверждение" : 
               "Создание профиля"}
            </span>
          </h1>
          <div className="w-24"></div> {/* Пустой div для выравнивания */}
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 border shadow-sm">
            {step === "email" && (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold">Добро пожаловать!</h2>
                  <p className="text-muted-foreground">
                    Войдите или зарегистрируйтесь, чтобы участвовать в лидерборде
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2"></div>
                        Отправка кода...
                      </>
                    ) : (
                      "Отправить код"
                    )}
                  </Button>
                </div>
              </form>
            )}
            
            {step === "otp" && (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold">Проверочный код</h2>
                  <p className="text-muted-foreground">
                    Введите 6-значный код, отправленный на {email}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-center py-4">
                    <InputOTP 
                      maxLength={6} 
                      value={otp} 
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2"></div>
                          Проверка кода...
                        </>
                      ) : (
                        "Подтвердить"
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setStep("email")}
                      disabled={isLoading}
                    >
                      Изменить email
                    </Button>
                  </div>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Не получили код? <button type="button" className="text-primary font-medium hover:underline">Отправить повторно</button></p>
                </div>
              </form>
            )}
            
            {step === "profile" && (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold">Создайте профиль</h2>
                  <p className="text-muted-foreground">
                    Как вас будут видеть другие игроки
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium">
                      Имя пользователя
                    </label>
                    <Input
                      id="username"
                      placeholder="CryptoMaster"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2"></div>
                        Создание профиля...
                      </>
                    ) : (
                      "Создать профиль"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
          
          <div className="mt-8 text-center space-y-4">
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/battle-vs-computer")}
                className="flex items-center gap-2"
              >
                <Gamepad className="h-4 w-4" />
                Играть
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate("/leaderboard")}
                className="flex items-center gap-2"
              >
                <Trophy className="h-4 w-4" />
                Лидерборд
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Авторизация нужна только для участия в лидерборде. Вы можете играть без авторизации.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-4 border-t border-game-primary/20">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} КриптоХерои | Персонажи криптомонет из топ-100 CoinMarketCap
        </div>
      </footer>
    </div>
  );
};

export default Auth;
