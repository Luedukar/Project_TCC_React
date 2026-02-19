function Form({
  // props (dados a serem fornecidos ao componente)
  type,
  placeholder,
  value,
  set,
  fieldName,
  icon,
  // alguns já vem com valores padrão, então é ncessario declarar somente se necessario alterar para valores distintos
  iconTop = "70%",
  pr = "30px",
  text = "text-sm",
  // optional input attributes
  step,
  min,
  inputMode,
}) {
  return (
    // alguns usam style pois permitem maior flexibilidade na hora de definir estilos dinâmicos
    <div className="relative w-full pt-[20px]">
      <input
        className={`w-full rounded-lg bg-zinc-200 pt-[8px] pb-[8px] pl-[20px] ${text} font-medium text-zinc-800 outline-none`}
        style={{ paddingRight: pr }}
        type={type}
        step={step}
        min={min}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        required
        onChange={(e) =>
          set((prev) => ({ ...prev, [fieldName]: e.target.value }))
        }
      />

      <i
        className={`${icon} absolute right-[15px] -translate-y-1/2 bg-transparent text-xl`}
        style={{ top: iconTop }}
      />
    </div>
  );
}
export default Form;
