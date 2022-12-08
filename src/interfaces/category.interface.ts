export interface CategoryAttributes {
    category_id: number;
    category_name: string;
    category_description: string;
    category_icon: string;
    category_status: boolean;
}

export interface SubCategoryAttributes {
    subcategory_id: number;
    category_id: number;
    subcategory_name: string;
    subcategory_description: string;
    subcategory_icon: string;
    subcategory_status: boolean;
}