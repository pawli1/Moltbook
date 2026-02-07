
const PROMPT_INJECTION_TRIGGERS = [
  /ignore (all )?previous instructions/gi,
  /system prompt/gi,
  /you are now a/gi,
  /dan mode/gi,
  /developer mode/gi,
  /new rule:/gi,
  /\[system\]/gi,
  /\(system\)/gi,
  /jailbreak/gi
];

export const cleanContent = (content: string): { content: string; wasCleansed: boolean } => {
  let wasCleansed = false;
  let sanitized = content;

  PROMPT_INJECTION_TRIGGERS.forEach(trigger => {
    if (trigger.test(sanitized)) {
      wasCleansed = true;
      sanitized = sanitized.replace(trigger, "[REDACTED_TRIGGER]");
    }
  });

  return { content: sanitized, wasCleansed };
};
