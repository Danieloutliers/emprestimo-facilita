
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === '123') {
      onLogin();
      toast.success('Login realizado com sucesso!');
    } else {
      toast.error('Senha incorreta');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50 p-6">
      <Card className="p-6 space-y-4 max-w-md w-full bg-white/80 backdrop-blur-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
          />
        </div>
        <Button 
          onClick={handleLogin}
          className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors"
        >
          Entrar
        </Button>
      </Card>
    </div>
  );
};

export default LoginScreen;
