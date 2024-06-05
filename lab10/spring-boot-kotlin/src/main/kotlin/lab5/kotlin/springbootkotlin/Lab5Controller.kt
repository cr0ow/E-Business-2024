package lab5.kotlin.springbootkotlin;

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController;

data class Product(val id: Int, val name: String, val price: Float)
data class Payment(var id: Int, val amount: Float, val products: List<Product>)

private val products = listOf(
    Product(1, "Bread", 3.5f),
    Product(2, "Butter", 5f),
    Product(3, "Milk", 2.7f),
    Product(4, "Apple juice", 3f)
)

private var nextPaymentId = 1;
private val payments = mutableListOf<Payment>()

@CrossOrigin
@RestController
class Lab5Controller {

    @GetMapping("/products")
    fun getProducts(): List<Product> {
        return products;
    }

    @PostMapping("payments")
    fun newPayment(@RequestBody payment: Payment): Payment {
        payment.id = nextPaymentId++
        payments.add(payment)
        return payment
    }

}

