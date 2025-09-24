import { useSearchParams, useRouter } from "next/navigation";
import SelectedTag from "./SelectedTag";

export function SelectedSort() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const sortValue = searchParams.get("sort");
    if (!sortValue) return null;

    const sortLabels: Record<string, string> = {
        created_at: "New Product List",
        price: "Price, low to high",
        "-price": "Price, high to low",
    };

    const handleRemove = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("sort");
        params.delete("page");
        router.push(`/listing?${params.toString()}`);
    };

    return <SelectedTag label={sortLabels[sortValue] || "Sorted"} onRemove={handleRemove} />;
}
