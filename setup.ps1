# OnDrive Realty - Setup Script for Windows PowerShell

Write-Host "================================================"
Write-Host "  OnDrive Realty - Automated Setup Script"
Write-Host "================================================"
Write-Host ""

# Install Backend Dependencies
Write-Host "Installing backend dependencies..."
Set-Location backend
npm install
Set-Location ..
Write-Host ""

# Install Frontend Dependencies  
Write-Host "Installing frontend dependencies..."
Set-Location frontend
npm install
Set-Location ..
Write-Host ""

Write-Host "================================================"
Write-Host "  Setup Complete!"
Write-Host "================================================"
Write-Host ""
Write-Host "Next Steps:"
Write-Host "1. Edit backend\.env (MongoDB URI, JWT secret)"
Write-Host "2. Edit frontend\.env.local (API URL)"
Write-Host "3. Start backend: cd backend && npm run dev"
Write-Host "4. Start frontend: cd frontend && npm run dev"
Write-Host "5. Visit: http://localhost:3000"
Write-Host ""
