const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function main() {
  try {
    // Ejecutar hardhat flatten
    const output = execSync('npx hardhat flatten contracts/MoDASToken.sol').toString();
    
    // Eliminar licencias SPDX duplicadas
    const cleanedOutput = output.replace(/\/\/ SPDX-License-Identifier: MIT\n/g, '');
    const finalOutput = '// SPDX-License-Identifier: MIT\n' + cleanedOutput;
    
    // Guardar el resultado
    fs.writeFileSync(
      path.join(__dirname, '../contracts/MoDASToken.flattened.sol'),
      finalOutput
    );
    
    console.log('Contrato aplanado guardado en contracts/MoDASToken.flattened.sol');
  } catch (error) {
    console.error('Error al aplanar el contrato:', error);
    process.exit(1);
  }
}

main(); 