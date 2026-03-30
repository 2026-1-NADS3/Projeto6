# Script de Automação: Setup e Monitoramento

## Descrição
Este script Bash foi desenvolvido para atender aos requisitos de automação de tarefas relacionadas ao ambiente de desenvolvimento e monitoramento do sistema.

### Funcionalidades:
1. **Setup do Ambiente**:
   - Verifica a instalação de dependências como Java.
   - Fornece instruções para instalar o Android SDK e ferramentas de build no Windows.

2. **Monitoramento do Sistema**:
   - Coleta métricas do sistema, como:
     - Uso de CPU.
     - Uso de memória.
     - Uso de disco.

## Como Executar
1. Abra o **Git Bash** ou outro terminal compatível com Bash.
2. Navegue até o diretório onde o script está salvo:
   ```bash
   cd "C:/Users/25027317/Desktop/backend maya"

3:Execute o script
   bash setup_and_monitor.sh

   4:Escolha uma das opções no menu:
1: Setup do ambiente.
2: Monitoramento do sistema.


---

### **2. Gere evidências de execução**
Execute o script no seu ambiente e capture os resultados para mostrar ao professor.

#### Como capturar os resultados:
- **No Git Bash**:
  1. Execute o script.
  2. Copie e cole a saída do terminal em um arquivo de texto ou tire capturas de tela.
- **Exemplo de saída esperada**:
  ```plaintext
  Escolha uma opção:
  1. Setup do ambiente
  2. Monitoramento do sistema
  Digite sua escolha (1 ou 2): 2
  Iniciando monitoramento do sistema no Windows...
  Uso de CPU:
  LoadPercentage
  15
  Uso de Memória:
  FreePhysicalMemory=1234567
  TotalVisibleMemorySize=8000000
  Uso de Disco:
  Caption  FreeSpace    Size
  C:       50000000000 100000000000
  Monitoramento concluído!