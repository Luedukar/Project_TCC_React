export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-[90deg,#e2e2e2,#c9d6ff]">
      <div className="relative m-[20px] h-[calc(100vh-40px)] w-[850px] overflow-hidden rounded-4xl bg-white shadow-[0_0_30px_rgba(0,0,0,0.2)] sm:h-[550px]">
        {children}
      </div>
    </div>
  );
}
