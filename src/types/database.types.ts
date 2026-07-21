export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      donation_info: {
        Row: {
          donation_phone: string | null
          qr_image_url: string | null
          shelter_id: string
          updated_at: string | null
        }
        Insert: {
          donation_phone?: string | null
          qr_image_url?: string | null
          shelter_id: string
          updated_at?: string | null
        }
        Update: {
          donation_phone?: string | null
          qr_image_url?: string | null
          shelter_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donation_info_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: true
            referencedRelation: "shelters"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_questions: {
        Row: {
          id: string
          label_en: string
          label_es: string
          order_index: number | null
          question_key: string
        }
        Insert: {
          id?: string
          label_en: string
          label_es: string
          order_index?: number | null
          question_key: string
        }
        Update: {
          id?: string
          label_en?: string
          label_es?: string
          order_index?: number | null
          question_key?: string
        }
        Relationships: []
      }
      onboarding_responses: {
        Row: {
          answer: string | null
          question_id: string
          shelter_id: string
        }
        Insert: {
          answer?: string | null
          question_id: string
          shelter_id: string
        }
        Update: {
          answer?: string | null
          question_id?: string
          shelter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "onboarding_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboarding_responses_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: false
            referencedRelation: "shelters"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_orgs: {
        Row: {
          active: boolean | null
          contact_url: string | null
          description: string | null
          id: string
          name: string
          region: string | null
        }
        Insert: {
          active?: boolean | null
          contact_url?: string | null
          description?: string | null
          id?: string
          name: string
          region?: string | null
        }
        Update: {
          active?: boolean | null
          contact_url?: string | null
          description?: string | null
          id?: string
          name?: string
          region?: string | null
        }
        Relationships: []
      }
      pet_photos: {
        Row: {
          id: string
          is_primary: boolean | null
          order_index: number | null
          pet_id: string
          url: string
        }
        Insert: {
          id?: string
          is_primary?: boolean | null
          order_index?: number | null
          pet_id: string
          url: string
        }
        Update: {
          id?: string
          is_primary?: boolean | null
          order_index?: number | null
          pet_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "pet_photos_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pets: {
        Row: {
          age: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          shelter_id: string
          size: string | null
          species: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          age?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          shelter_id: string
          size?: string | null
          species?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          shelter_id?: string
          size?: string | null
          species?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pets_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: false
            referencedRelation: "shelters"
            referencedColumns: ["id"]
          },
        ]
      }
      product_photos: {
        Row: {
          id: string
          is_primary: boolean | null
          order_index: number | null
          product_id: string
          url: string
        }
        Insert: {
          id?: string
          is_primary?: boolean | null
          order_index?: number | null
          product_id: string
          url: string
        }
        Update: {
          id?: string
          is_primary?: boolean | null
          order_index?: number | null
          product_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_photos_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number | null
          shelter_id: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price?: number | null
          shelter_id: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number | null
          shelter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: false
            referencedRelation: "shelters"
            referencedColumns: ["id"]
          },
        ]
      }
      shelter_profile: {
        Row: {
          address: string | null
          adoption_form_url: string | null
          after_image_url: string | null
          after_text: string | null
          animals_saved: number | null
          before_image_url: string | null
          before_text: string | null
          founded_year: number | null
          hero_image_url: string | null
          shelter_id: string
          story: string | null
          story_image_url: string | null
          updated_at: string | null
          volunteers_count: number | null
          volunteers_form_url: string | null
          whatsapp_number: string | null
        }
        Insert: {
          address?: string | null
          adoption_form_url?: string | null
          after_image_url?: string | null
          after_text?: string | null
          animals_saved?: number | null
          before_image_url?: string | null
          before_text?: string | null
          founded_year?: number | null
          hero_image_url?: string | null
          shelter_id: string
          story?: string | null
          story_image_url?: string | null
          updated_at?: string | null
          volunteers_count?: number | null
          volunteers_form_url?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          address?: string | null
          adoption_form_url?: string | null
          after_image_url?: string | null
          after_text?: string | null
          animals_saved?: number | null
          before_image_url?: string | null
          before_text?: string | null
          founded_year?: number | null
          hero_image_url?: string | null
          shelter_id?: string
          story?: string | null
          story_image_url?: string | null
          updated_at?: string | null
          volunteers_count?: number | null
          volunteers_form_url?: string | null
          whatsapp_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shelter_profile_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: true
            referencedRelation: "shelters"
            referencedColumns: ["id"]
          },
        ]
      }
      shelter_sections: {
        Row: {
          id: string
          order_index: number
          section_key: string
          shelter_id: string
          visible: boolean | null
        }
        Insert: {
          id?: string
          order_index?: number
          section_key: string
          shelter_id: string
          visible?: boolean | null
        }
        Update: {
          id?: string
          order_index?: number
          section_key?: string
          shelter_id?: string
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "shelter_sections_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: false
            referencedRelation: "shelters"
            referencedColumns: ["id"]
          },
        ]
      }
      shelters: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          locale: string | null
          logo_url: string | null
          name: string
          owner_id: string | null
          slug: string
          status: string | null
          theme_color: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          locale?: string | null
          logo_url?: string | null
          name: string
          owner_id?: string | null
          slug: string
          status?: string | null
          theme_color?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          locale?: string | null
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          slug?: string
          status?: string | null
          theme_color?: string | null
        }
        Relationships: []
      }
      site_stats: {
        Row: {
          date: string
          id: string
          shelter_id: string
          visits: number | null
        }
        Insert: {
          date?: string
          id?: string
          shelter_id: string
          visits?: number | null
        }
        Update: {
          date?: string
          id?: string
          shelter_id?: string
          visits?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "site_stats_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: false
            referencedRelation: "shelters"
            referencedColumns: ["id"]
          },
        ]
      }
      social_links: {
        Row: {
          id: string
          platform: string
          shelter_id: string
          url: string
        }
        Insert: {
          id?: string
          platform: string
          shelter_id: string
          url: string
        }
        Update: {
          id?: string
          platform?: string
          shelter_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_links_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: false
            referencedRelation: "shelters"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_orphaned_shelters: { Args: never; Returns: undefined }
      get_my_shelter_ids: { Args: never; Returns: string[] }
      increment_site_visit: {
        Args: { p_shelter_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
