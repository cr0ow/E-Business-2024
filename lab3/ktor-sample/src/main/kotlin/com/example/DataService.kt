package com.example

data class Product(val name: String, val category: String)

val categories: ArrayList<String> = ArrayList()
val products: ArrayList<Product> = ArrayList()

fun initializeData() {
    categories.add("jeden")
    categories.add("dwa")
    categories.add("trzy")
    products.add(Product("jeden", "jeden"))
    products.add(Product("dwa", "dwa"))
    products.add(Product("trzy", "trzy"))
}

fun showCategories(): String {
    var result = ""
    var i = 1
    categories.forEach {
        result += "$i. $it\n"
        i++
    }
    return result
}

fun showProducts(): String {
    var result = ""
    var i = 1
    products.forEach {
        result += "$i. name: ${it.name}, category: ${it.category}\n"
        i++
    }
    return result
}