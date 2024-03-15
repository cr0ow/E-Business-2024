case class Product(id: Long, name: String, description: String)

val nextId: Long = 4
val products: List[Product] =
    List(
        Product(1, "mleko", "świeże mleko"),
        Product(2, "jajka", "z wolnego wybiegu")
        Product(3, "mąka", "pszenna")
    )

def createNewProduct(product: Product) {
    val newProduct = Product(nextId, product.name, product.description)
    products.add(newProduct)
    return nextId++;
}