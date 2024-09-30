import { TItem } from "./App";

export const workflow: TItem[] = [
  { id: 1, priority: "low", title: "Fazer algo", status: "in_progress" },
  {
    id: 2,
    priority: "high",
    title: "Resolver bug no sistema",
    status: "in_progress",
  },
  {
    id: 3,
    priority: "medium",
    title: "Revisar pull request",
    status: "in_progress",
  },
  { id: 4, priority: "low", title: "Documentar API", status: "in_progress" },
  {
    id: 5,
    priority: "medium",
    title: "Testar funcionalidades novas",
    status: "pending",
  },
  {
    id: 6,
    priority: "high",
    title: "Criar novo layout",
    status: "in_progress",
  },
  {
    id: 7,
    priority: "low",
    title: "Atualizar dependências",
    status: "pending",
  },
  {
    id: 8,
    priority: "medium",
    title: "Testar integração com API",
    status: "review",
  },
  { id: 9, priority: "low", title: "Limpar código antigo", status: "done" },
  {
    id: 10,
    priority: "high",
    title: "Configurar pipeline de CI/CD",
    status: "in_progress",
  },
  {
    id: 11,
    priority: "medium",
    title: "Implementar autenticação",
    status: "pending",
  },
  {
    id: 12,
    priority: "low",
    title: "Escrever testes unitários",
    status: "review",
  },
  {
    id: 13,
    priority: "medium",
    title: "Analisar logs de erros",
    status: "done",
  },
  {
    id: 14,
    priority: "high",
    title: "Optimizar queries no banco de dados",
    status: "in_progress",
  },
  {
    id: 15,
    priority: "low",
    title: "Revisar documentação interna",
    status: "pending",
  },
  {
    id: 16,
    priority: "medium",
    title: "Criar protótipos de UI",
    status: "review",
  },
  {
    id: 17,
    priority: "high",
    title: "Resolver problema de desempenho",
    status: "in_progress",
  },
  {
    id: 18,
    priority: "medium",
    title: "Implementar notificações",
    status: "done",
  },
  { id: 19, priority: "low", title: "Ajustar estilos CSS", status: "pending" },
  {
    id: 20,
    priority: "high",
    title: "Refatorar componente principal",
    status: "review",
  },
];
