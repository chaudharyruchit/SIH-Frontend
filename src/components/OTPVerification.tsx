import { useState } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import alumglobeLogo from '@/assets/alumglobe-logo.png';

interface OTPVerificationProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

const OTPVerification = ({ email, onVerified, onBack }: OTPVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate OTP verification (frontend only)
    setTimeout(() => {
      // Accept "123456" as valid OTP for demo
      if (otp === '123456') {
        setIsVerified(true);
        toast({
          title: "OTP Verified Successfully!",
          description: "Your account has been created and verified.",
        });
        
        // Show success animation then complete signup
        setTimeout(() => {
          onVerified();
        }, 2000);
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP code you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResendOTP = () => {
    toast({
      title: "OTP Resent",
      description: "A new OTP has been sent to your email address.",
    });
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="card-elevated animate-fade-in w-full max-w-md">
          <CardContent className="text-center py-16">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4 animate-bounce-gentle" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Account Verified!</h2>
            <p className="text-muted-foreground">
              Welcome to AlumGlobe! Your account has been successfully created and verified.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Signup
          </Button>
        </div>

        <Card className="card-elevated animate-fade-in">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <img src={alumglobeLogo} alt="AlumGlobe" className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
            <p className="text-muted-foreground">
              We've sent a 6-digit verification code to
              <br />
              <span className="font-medium text-foreground">{email}</span>
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  value={otp}
                  onChange={setOtp}
                  maxLength={6}
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

              <Button 
                onClick={handleVerifyOTP}
                className="w-full btn-hero" 
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify OTP'
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Didn't receive the code?
                </p>
                <Button 
                  variant="ghost" 
                  onClick={handleResendOTP}
                  className="text-primary hover:text-primary-light"
                >
                  Resend OTP
                </Button>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                <p>For demo purposes, use OTP: <span className="font-mono font-bold">123456</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerification;