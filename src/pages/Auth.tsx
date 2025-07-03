
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
        title: "Error",
        description: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate sending code to email
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      
      toast({
        title: "Code sent",
        description: `Verification code sent to ${email}`,
      });
      
      // For demo purposes, show the code immediately
      toast({
        title: "Demo: Your code",
        description: "Use code 123456 to log in",
      });
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a 6-digit code",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate code verification
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, any 6-digit code will be accepted
      if (otp === "123456") {
        // If user is already registered, redirect to main page
        setStep("profile");
        
        toast({
          title: "Code verified",
          description: "Code successfully verified!",
        });
      } else {
        toast({
          title: "Invalid code",
          description: "Please check the code and try again",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || username.length < 3) {
      toast({
        title: "Error",
        description: "Username must be at least 3 characters long",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate saving profile
    setTimeout(() => {
      setIsLoading(false);
      
      // Save to localStorage for demo
      localStorage.setItem("user", JSON.stringify({
        email,
        username,
        joined: new Date().toISOString(),
      }));
      
      toast({
        title: "Welcome!",
        description: `${username}, your profile has been created successfully!`,
      });
      
      // Redirect to main page
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-game-background via-purple-900/80 to-pink-900/80">
      {/* Neon background effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-neon-pink/10 via-transparent to-neon-purple/10 pointer-events-none"></div>
      
      <header className="relative w-full py-6 border-b border-neon-pink/30 backdrop-blur-sm bg-black/20">
        <div className="container flex items-center justify-between">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-neon-pink/50 text-neon-pink hover:bg-neon-pink/20 hover:border-neon-pink transition-all neon-glow"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-center flex items-center gap-3">
            <User className="h-8 w-8 text-neon-pink drop-shadow-lg" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-purple neon-text">
              {step === "email" ? "Authentication" : 
               step === "otp" ? "Verification" : 
               "Create Profile"}
            </span>
          </h1>
          <div className="w-24"></div> {/* Empty div for alignment */}
        </div>
      </header>

      <main className="relative flex-1 container py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-neon-pink/30 shadow-2xl neon-glow">
            {step === "email" && (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold text-white neon-text">Welcome!</h2>
                  <p className="text-white/70">
                    Login or register to participate in the leaderboard
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-black/50 border-neon-purple/50 text-white placeholder-white/50 focus:border-neon-pink"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-pink/80 hover:to-neon-purple/80 text-white font-semibold neon-glow"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2"></div>
                        Sending code...
                      </>
                    ) : (
                      "Send Code"
                    )}
                  </Button>
                </div>
              </form>
            )}
            
            {step === "otp" && (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold text-white neon-text">Verification Code</h2>
                  <p className="text-white/70">
                    Enter the 6-digit code sent to {email}
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
                        <InputOTPSlot index={0} className="border-neon-purple/50 text-white bg-black/50" />
                        <InputOTPSlot index={1} className="border-neon-purple/50 text-white bg-black/50" />
                        <InputOTPSlot index={2} className="border-neon-purple/50 text-white bg-black/50" />
                        <InputOTPSlot index={3} className="border-neon-purple/50 text-white bg-black/50" />
                        <InputOTPSlot index={4} className="border-neon-purple/50 text-white bg-black/50" />
                        <InputOTPSlot index={5} className="border-neon-purple/50 text-white bg-black/50" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-pink/80 hover:to-neon-purple/80 text-white font-semibold neon-glow"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2"></div>
                          Verifying code...
                        </>
                      ) : (
                        "Verify"
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-neon-pink/50 text-neon-pink hover:bg-neon-pink/20 hover:border-neon-pink transition-all"
                      onClick={() => setStep("email")}
                      disabled={isLoading}
                    >
                      Change email
                    </Button>
                  </div>
                </div>
                
                <div className="text-center text-sm text-white/70">
                  <p>Didn't receive the code? <button type="button" className="text-neon-pink font-medium hover:underline">Resend</button></p>
                </div>
              </form>
            )}
            
            {step === "profile" && (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold text-white neon-text">Create Profile</h2>
                  <p className="text-white/70">
                    How other players will see you
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium text-white">
                      Username
                    </label>
                    <Input
                      id="username"
                      placeholder="CryptoMaster"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="bg-black/50 border-neon-purple/50 text-white placeholder-white/50 focus:border-neon-pink"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-pink/80 hover:to-neon-purple/80 text-white font-semibold neon-glow"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2"></div>
                        Creating profile...
                      </>
                    ) : (
                      "Create Profile"
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
                className="flex items-center gap-2 border-neon-pink/50 text-neon-pink hover:bg-neon-pink/20 hover:border-neon-pink transition-all neon-glow"
              >
                <Gamepad className="h-4 w-4" />
                Play
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate("/leaderboard")}
                className="flex items-center gap-2 border-neon-pink/50 text-neon-pink hover:bg-neon-pink/20 hover:border-neon-pink transition-all neon-glow"
              >
                <Trophy className="h-4 w-4" />
                Leaderboard
              </Button>
            </div>
            
            <p className="text-sm text-white/70">
              Authentication is only needed to participate in the leaderboard. You can play without authentication.
            </p>
          </div>
        </div>
      </main>

      <footer className="relative py-4 border-t border-neon-purple/30 backdrop-blur-sm bg-black/20">
        <div className="container text-center text-sm text-white/70">
          &copy; {new Date().getFullYear()} CryptoHeroes | Characters of cryptocurrencies from CoinMarketCap top-100
        </div>
      </footer>
    </div>
  );
};

export default Auth;
