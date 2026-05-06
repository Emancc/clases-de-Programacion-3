import Aside from "@/app/components/Aside";
import { getCategories } from "@/lib/notes";

export default function NotasLayout({ children }) {
  const categorias = getCategories();

  return (
    <div className="flex min-h-screen bg-zinc-900">
      <Aside data={categorias} />

      {children}
    </div>
  );
}
