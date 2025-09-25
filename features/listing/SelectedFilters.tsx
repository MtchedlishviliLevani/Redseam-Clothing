import { useSearchParams, useRouter } from "next/navigation";
import SelectedTag from "./SelectedTag";

export function SelectedFilters() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const priceFrom = searchParams.get("price_from");
    const priceTo = searchParams.get("price_to");

    if (!priceFrom && !priceTo) return null;

    const handleRemove = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("price_from");
        params.delete("price_to");
        params.delete("page");
        router.push(`/listing?${params.toString()}`);
    };

    return (
        <SelectedTag
            label={`Price: ${priceFrom || "0"} - ${priceTo || "∞"}`}
            onRemove={handleRemove}
        />
    );
}
